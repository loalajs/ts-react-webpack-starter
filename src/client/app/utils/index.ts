function getDisplayName(WrappedComponent: React.ComponentType) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export {
  getDisplayName,
};
