import type { CeremonyDetails, GraduationProfile } from '../types/graduation';

/**
 * Format Date to iCalendar UTC string format: YYYYMMDDTHHmmssZ
 */
function formatDateToIcs(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Generate .ics file and trigger download
 */
export function downloadIcsFile(profile: GraduationProfile, ceremony: CeremonyDetails): void {
  const startDate = new Date(ceremony.dateIso);
  // Default end time: 3.5 hours after start
  const endDate = new Date(startDate.getTime() + 3.5 * 60 * 60 * 1000);

  const startIcs = formatDateToIcs(startDate);
  const endIcs = formatDateToIcs(endDate);
  const nowIcs = formatDateToIcs(new Date());

  const title = `Lễ Tốt Nghiệp — ${profile.name} (${profile.universityShort || profile.university})`;
  const description = `Trân trọng kính mời bạn đến tham dự Lễ Tốt Nghiệp của ${profile.name} - ${profile.major}, ${profile.university}.\\nĐịa điểm: ${ceremony.venue}, ${ceremony.address}`;
  const location = `${ceremony.venue}, ${ceremony.address}`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Graduation Invitation//Personal Experience//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:graduation-${Date.now()}@graduation.app`,
    `DTSTAMP:${nowIcs}`,
    `DTSTART:${startIcs}`,
    `DTEND:${endIcs}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Nhắc nhở: Lễ Tốt Nghiệp ${profile.name} vào ngày mai!`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `Le_Tot_Nghiep_${profile.name.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generate Google Calendar Web Link
 */
export function getGoogleCalendarUrl(profile: GraduationProfile, ceremony: CeremonyDetails): string {
  const startDate = new Date(ceremony.dateIso);
  const endDate = new Date(startDate.getTime() + 3.5 * 60 * 60 * 1000);

  const startFormatted = startDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const endFormatted = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const text = encodeURIComponent(`Lễ Tốt Nghiệp — ${profile.name}`);
  const details = encodeURIComponent(
    `Trân trọng kính mời bạn tham dự Lễ Tốt Nghiệp của ${profile.name}.\nNgành: ${profile.major}\nTrường: ${profile.university}\nĐịa chỉ: ${ceremony.venue}, ${ceremony.address}`
  );
  const location = encodeURIComponent(`${ceremony.venue}, ${ceremony.address}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startFormatted}/${endFormatted}&details=${details}&location=${location}`;
}
