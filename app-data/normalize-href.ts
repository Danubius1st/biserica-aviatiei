export const normalizeHref = (href: string, db = false) => {
  return href
    .split('/')
    .map((segment, index) => {
      if (segment && index > 0) {
        return db ? `${segment}-db` : segment.replace(/-db$/, '');
      }
      return segment;
    })
    .join('/');
};
