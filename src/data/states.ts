// Maps US states to one of the regions defined in stores.ts, so users who
// don't want to share their browser location can just pick a state.
export const STATE_TO_REGION: Record<string, string> = {
  CT: 'northeast', ME: 'northeast', MA: 'northeast', NH: 'northeast',
  RI: 'northeast', VT: 'northeast', NY: 'northeast', NJ: 'northeast', PA: 'northeast',
  DE: 'mid-atlantic', MD: 'mid-atlantic', DC: 'mid-atlantic', VA: 'mid-atlantic', WV: 'mid-atlantic',
  NC: 'southeast', SC: 'southeast', GA: 'southeast', TN: 'southeast', AL: 'southeast',
  MS: 'southeast', KY: 'southeast', AR: 'southeast', LA: 'southeast',
  FL: 'florida',
  OH: 'midwest', MI: 'midwest', IN: 'midwest', IL: 'midwest', WI: 'midwest',
  MN: 'midwest', IA: 'midwest', MO: 'midwest', ND: 'midwest', SD: 'midwest', NE: 'midwest', KS: 'midwest',
  TX: 'texas', OK: 'texas',
  CO: 'mountain', UT: 'mountain', WY: 'mountain', MT: 'mountain', ID: 'mountain', NM: 'mountain',
  WA: 'pacific-northwest', OR: 'pacific-northwest', AK: 'pacific-northwest',
  CA: 'california', NV: 'california', HI: 'california',
  AZ: 'southwest',
};

export const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia',
  FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon',
  PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
  TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia',
  WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};
