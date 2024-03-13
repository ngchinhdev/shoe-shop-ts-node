import { updateLikesHeader } from "./updateHeader.js";

export async function handleClickLike(id) {
    let likesArr = JSON.parse(localStorage.getItem('likes')) || [];

    if (!likesArr.includes(id)) {
        likesArr.push(id);
    } else {
        likesArr = likesArr.filter(prod => prod != id);
    }

    localStorage.setItem('likes', JSON.stringify(likesArr));
    await updateLikesHeader();
}

export async function handleDeleteLiked(id) {
    let likesArr = JSON.parse(localStorage.getItem('likes')) || [];

    likesArr = likesArr.filter(likedId => likedId != id);

    localStorage.setItem('likes', JSON.stringify(likesArr));
    await updateLikesHeader();
}

export function isAlreadyLiked(id) {
    let likesArr = JSON.parse(localStorage.getItem('likes')) || [];

    const isAlready = likesArr.find(likedId => likedId == id);

    if (isAlready) return true;
}

export function handleToggleLike(element) {
    element.classList.toggle('active');
}