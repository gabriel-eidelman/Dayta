/* A collection of utility functions for handling date and time operations.
   This module includes functions for converting time formats, calculating durations,
   generating time blocks, and working with sunrise/sunset times.
*/

import SunCalc from 'suncalc';
import { DateTime } from 'luxon';
import { TimeBlock } from '@/Types/ActivityTypes';
import { TimeSelection } from '@/Types/TimeType';

const convertTimeToUnix = (timeString: string, date: Date = new Date()): number => {
    // Parse the time string
    if(timeString!=="888") {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
  
    // Convert 12-hour format to 24-hour format
    let hours24 = hours;
    if (period === 'PM' && hours !== 12) {
      hours24 += 12;
    } else if (period === 'AM' && hours === 12) {
      hours24 = 0;
    }
  
    // Set the UTC time based on the input
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hours24, minutes));
  
    // Convert to Unix timestamp and return
    return Math.floor(utcDate.getTime() / 1000);
  }
  else {
    // Convert the local Date object to UTC time
    const localDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      12,  // Hours
      10, // Minutes
      31  // Seconds
    );
    return localDate.getTime() / 1000;
  }
  };

const formatNewTime = (selectedTime: TimeSelection) => {
  return `${parseInt(selectedTime.hour)}:${selectedTime.minute} ${selectedTime.period}`;
};

      // Function to convert duration input to seconds
      function convertDurationToSeconds(minutes: number): number {
        return (minutes * 60);
      }
      
      // Function to create a TimeBlock based on user input
      function createTimeBlock(startTime: string, endTime: string, dateIncrement: number): TimeBlock {
        // am i turning time into unix and then right back? seems strange
        const startTimeUnix = convertTimeToUnix(startTime); // Convert start time to Unix timestamp
        // const durationSeconds = convertDurationToSeconds(durationMinutes); // Convert duration to seconds
        const localDate = new Date(startTimeUnix * 1000); 
        const offset = localDate.getTimezoneOffset(); // Time zone offset in minutes
        const utcZonedTime = dateIncrement==0 ? new Date(localDate.getTime() + offset * 60000) : adjustDateByDays(new Date(localDate.getTime() + offset * 60000), dateIncrement);
        let unixTimestamp = Math.floor(utcZonedTime.getTime() / 1000);
        if(localDate.getUTCHours()<4) {
          unixTimestamp = unixTimestamp+86400
        }
        const endTimeUnix = convertTimeToUnix(endTime); // Convert start time to Unix timestamp
        // const durationSeconds = convertDurationToSeconds(durationMinutes); // Convert duration to seconds
        const localEnd = new Date(endTimeUnix * 1000);
        const endOffset = localEnd.getTimezoneOffset();
        const utcZonedEndTime = dateIncrement == 0 
          ? new Date(localEnd.getTime() + endOffset * 60000)
          : adjustDateByDays(new Date(localEnd.getTime() + endOffset * 60000), dateIncrement);
        let unixEndTimestamp = Math.floor(utcZonedEndTime.getTime() / 1000);
        if(localEnd.getUTCHours()<4) {
          unixEndTimestamp = unixEndTimestamp+86400
        }
        // let endTimeUnix = null
        // if(startTimeUnix % 60 !== 31) {
        //   endTimeUnix = unixTimestamp + durationSeconds; // Calculate end time
        // }
        return {
          startTime: unixTimestamp,
          duration: endTimeUnix-startTimeUnix,
          endTime: unixEndTimestamp,
        };
      }

export const timeStringToSeconds = (timeString: string): number => {
    // Split the time string into hours and minutes
    const [hours, minutes] = timeString.split(':').map(Number);
  
    // Validate hours and minutes
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
      return 0; // Default value for invalid time input
    }
  
    // Convert hours and minutes to seconds
    return (hours * 3600) + (minutes * 60);
  };
  

function adjustDateByDays(date: Date, days: number): Date {
    // Create a copy of the original date to avoid mutating it
    const adjustedDate = new Date(date);
  
    // Get the current date components
    const currentDate = adjustedDate.getDate();
  
    // Set the new date
    adjustedDate.setDate(currentDate + days);
  
    // Preserve time components (hours, minutes, seconds, milliseconds)
    adjustedDate.setHours(date.getHours());
    adjustedDate.setMinutes(date.getMinutes());
    adjustedDate.setSeconds(date.getSeconds());
    adjustedDate.setMilliseconds(date.getMilliseconds());
  
    return adjustedDate;
  }

  const generateTimeString = (selectedTime: TimeSelection) => {
    //const localTime = 
    let timeString="888"
    if(selectedTime.hour && selectedTime.minute && selectedTime.period) {
      timeString = selectedTime.hour + ":" + selectedTime.minute + " " + selectedTime.period
    }
    else {
    }
    console.log("generated time string", timeString)
    return timeString
  }

const decimalToTime = (decimal: number): string => {
    // Normalize the decimal by handling values above 24 (i.e., past midnight)
    if (decimal >= 24) {
      decimal -= 24;
    }
  
    // Extract hours and minutes from the decimal number
    const hours24 = Math.floor(decimal);
    const minutes = Math.round((decimal - hours24) * 60);
  
    // Convert 24-hour time to 12-hour format
    const period = hours24 >= 12 ? 'PM' : 'AM';
    let hours12 = hours24 % 12;
    if (hours12 === 0) hours12 = 12; // Handle midnight and noon cases
  
    // Format minutes to always be two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    // Return time in 'HH:MM AM/PM' format
    return `${hours12}:${formattedMinutes} ${period}`;
  };
  
const decimalToDurationTime = (decimal: number): string => {
    // Extract hours and minutes from the decimal number
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
  
    // Format hours and minutes to always be two digits
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    // Return time in 'HH:MM' format
    return `${formattedHours}:${formattedMinutes}`;
  };
const formatSecondsToHHMM = (seconds: number): string => {
    // Calculate hours and minutes from the total seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    // Format hours and minutes to always be two digits
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    // Return time in 'HH:MM' format
    return `${formattedHours}:${formattedMinutes}`;
  };
  
function getSunriseSunset(date: Date, timeZone: string): { sunrise: string; sunset: string } {
  // Create a DateTime object in the given time zone
  
  // Calculate sunrise and sunset times using SunCalc
  const coords = getCoordinatesFromTimeZone(timeZone)
  if(coords) {
    const sunTimes = SunCalc.getTimes(date, coords.latitude, coords.longitude);
    // Convert sunrise and sunset times to the local time zone
    const sunrise = DateTime.fromJSDate(sunTimes.sunrise).setZone(timeZone).toFormat('yyyy-MM-dd HH:mm:ss');
    const sunset = DateTime.fromJSDate(sunTimes.sunset).setZone(timeZone).toFormat('yyyy-MM-dd HH:mm:ss');
    console.log(sunrise, sunset)
    return { sunrise, sunset };
  }
  else {
    console.log('no coords');
    return {sunrise: "oui", sunset: "non"}
  }
}
interface TimeZoneCoordinates {
  latitude: number;
  longitude: number;
}
function getCoordinatesFromTimeZone(timeZone: string): TimeZoneCoordinates | null {
  const timeZoneMap: { [key: string]: TimeZoneCoordinates } = {
    'America/New_York': { latitude: 40.7128, longitude: -74.0060 }, // New York City, USA
    'America/Los_Angeles': { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles, USA
    'America/Chicago': { latitude: 41.8781, longitude: -87.6298 }, // Chicago, USA
    'America/Denver': { latitude: 39.7392, longitude: -104.9903 }, // Denver, USA
    'Europe/London': { latitude: 51.5074, longitude: -0.1278 }, // London, UK
    'Europe/Paris': { latitude: 48.8566, longitude: 2.3522 }, // Paris, France
    'Europe/Berlin': { latitude: 52.5200, longitude: 13.4050 }, // Berlin, Germany
    'Asia/Tokyo': { latitude: 35.6895, longitude: 139.6917 }, // Tokyo, Japan
    'Asia/Shanghai': { latitude: 31.2304, longitude: 121.4737 }, // Shanghai, China
    'Asia/Kolkata': { latitude: 22.5726, longitude: 88.3639 }, // Kolkata, India
    'Australia/Sydney': { latitude: -33.8688, longitude: 151.2093 }, // Sydney, Australia
    'Africa/Johannesburg': { latitude: -26.2041, longitude: 28.0473 }, // Johannesburg, South Africa
    // Add more time zones as needed
  };

  return timeZoneMap[timeZone] || null;
}

const generateISODate = (adjustment: number, userTimeZone: string) => {
  const nowInUserTimezone = DateTime.now().setZone(userTimeZone).plus({ days: adjustment })
  const dateIso = nowInUserTimezone.toISO()
  let finalIso = ""
  if(dateIso) {
    finalIso = dateIso
  }
  
  return finalIso
  
}

export {generateISODate, getSunriseSunset, formatSecondsToHHMM, decimalToTime, decimalToDurationTime, adjustDateByDays, createTimeBlock, convertDurationToSeconds, formatNewTime, convertTimeToUnix, generateTimeString} 