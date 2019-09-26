import { day } from '@/constants';

const darkLocalStorageKey = 'dark';
const darkLocalStorageExpiredKey = 'dark-expired';

const getDarkExpiredTime = () => {
  let darkLocalStorageExpiredTime = Date.parse(
    localStorage.getItem(darkLocalStorageExpiredKey)
  );
  if (Number.isNaN(darkLocalStorageExpiredTime)) return null;
  const date = new Date(darkLocalStorageExpiredTime);
  if (date > new Date()) return null;
  return date;
};

const updateDarkExpiredTime = () =>
  localStorage.setItem(darkLocalStorageExpiredKey, new Date().toISOString());

const isDarkMode = () => {
  let darkLocalStorageExpiredTime = getDarkExpiredTime();
  if (
    darkLocalStorageExpiredTime &&
    new Date(Number(darkLocalStorageExpiredTime) + 1 * day) > new Date()
  ) {
    if (localStorage.getItem(darkLocalStorageKey) === 'true') {
      updateDarkExpiredTime();
      return true;
    }
    if (localStorage.getItem(darkLocalStorageKey) === 'false') {
      updateDarkExpiredTime();
      return false;
    }
  }
  return (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
};

const saveDark = () => {
  updateDarkExpiredTime();
  localStorage.setItem(darkLocalStorageKey, 'true');
};

const saveLight = () => {
  updateDarkExpiredTime();
  localStorage.setItem(darkLocalStorageKey, 'false');
};

export { isDarkMode, saveDark, saveLight };
