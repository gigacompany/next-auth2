export const isWindowAvailable = () => typeof window !== "undefined";

export const findCurrentRoute = (routes) => {
  if (!isWindowAvailable()) {
    return null; // Handle gracefully if window is not available
  }

  const foundRoute = routes.find(
    (route) =>
      window.location.href.indexOf(route.layout + route.path) !== -1 &&
      route
  );

  return foundRoute;
};


export const getActiveRoute = (routes) => {
  const route = findCurrentRoute(routes);
  return route?.name || "Default Brand Text";
};

export const getActiveNavbar = (routes) => {
  const route = findCurrentRoute(routes);
  return route?.secondary;
};

export const getActiveNavbarText = (routes) => {
  return getActiveRoute(routes) || false;
};
