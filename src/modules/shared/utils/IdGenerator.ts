export function getRoomId(){
    let scale = 1000000;
    return scale + Math.round(Math.random() * scale);
}