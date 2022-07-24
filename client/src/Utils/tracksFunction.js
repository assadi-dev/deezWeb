/**
 * @param {array} selector
 * retourn le titre et l'id des playlists
 */
export const getTopPlaylist = async (selector) => {
  let data = await selector;
  console.log(data);
};

export const sleep = (ms) => {
  return new Promise((resolve) => {
    let timeout = setTimeout(() => {
      resolve("done");
      clearTimeout(timeout);
    }, ms);
  });
};
