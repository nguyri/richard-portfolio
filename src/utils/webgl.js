export function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext && (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

export function isWebGL2Available() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext && canvas.getContext('webgl2'));
  } catch (e) {
    return false;
  }
}
