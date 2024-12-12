export const isDomainValid = (domain) => {
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
};

export const parseDomainList = (content) => {
  return content
    .split(/[\n,]/)
    .map(domain => domain.trim())
    .filter(domain => domain.length > 0);
};