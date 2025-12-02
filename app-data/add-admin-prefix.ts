import { navigationType } from '@/models/navigation';

export const addAdminPrefix = (menu: navigationType | navigationType[]) => {

  const processItem = (item: navigationType): navigationType => {
    const newItem: navigationType = { ...item }; // item copy

    if (newItem.href.startsWith('/')) {
      newItem.href = '/' + 'admin-' + newItem.href.substring(1);
    }

    if (newItem.subMenu && newItem.subMenu.length > 0) {
      newItem.subMenu = newItem.subMenu.map(subItem => processItem(subItem));
    }

    return newItem;
  };

  if (Array.isArray(menu)) {
    return menu.map(item => processItem(item));
  } else {
    return processItem(menu);
  }
};
