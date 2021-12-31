import arrow from '../images/Arrow1.png'
import arrow_lock from '../images/Arrow2.png'

const buttonLock = (btn, img) => {
    btn.current.style.cursor = 'default';
    btn.current.style.background = '#C4C4C4';
    btn.current.style.border = '2.5px solid #A4A4A4';
    btn.current.style.color = '#878787';
    img.current.style.content = `url(${arrow_lock})`;
}
const buttonOpen = (btn, img) => {
    btn.current.style.cursor = 'pointer';
    btn.current.style.background = '#9BAECB'
    btn.current.style.border = '2.5px solid #7E94B7';
    btn.current.style.color = '#647795'
    img.current.style.content = `url(${arrow})`;
}

export {
    buttonLock, buttonOpen
};