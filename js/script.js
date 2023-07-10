const cards = document.querySelectorAll('.card'),
      refresh = document.querySelector('.refresh-btn');

function hexGenerator(){
    const arr = [1,2,3,4,5,6,7,8,9,'a', 'b', 'c', 'd', 'e', 'f'];

    let hexCode = ['#'];
    for (let i = 0; i < 6; i++) {
            const current = Math.floor(Math.random()* arr.length);
            hexCode.push(arr[current]);
        }

    return hexCode.join('');
}

function changeCardsColor(cards) {
    cards.forEach(card => {
        if(!card.classList.contains('locked')){
            const hex = hexGenerator();
            card.querySelector('.card__color').style.background = hex;
            card.querySelector('.card__text').textContent = hex;
            CopyText(card, hex);
        }
    });
}

function CopyText(card, hex) {
    card.addEventListener('click', (e)=>{
        if(e.target.classList.contains('card__text')){
            navigator.clipboard.writeText(hex.toUpperCase())
            .then(()=>{
                card.querySelector('.card__text').textContent = 'COPIED';
                setTimeout(()=>{
                    card.querySelector('.card__text').textContent = hex;
                },2000);
            });
        }
    });
}

changeCardsColor(cards);

cards.forEach(card => {
    const color = card.querySelector('.card__color');
    color.innerHTML = `
    <img class="card__lock" src="icons/lock-icon.svg" alt="">
    `;
    const lock = card.querySelector('.card__lock');
    color.addEventListener('mouseover', ()=>{
        lock.classList.add('card__lock_pre-active');
    });
    color.addEventListener('mouseout', ()=>{
        lock.classList.remove('card__lock_pre-active');
    });
    color.addEventListener('click', ()=>{
            if(!lock.classList.contains('card__lock_active')){
                card.classList.add('locked');
                lock.classList.add('card__lock_active');
            }else{
                card.classList.remove('locked');
                lock.classList.remove('card__lock_active');
            }
    });
});


refresh.addEventListener('click', ()=>{
    changeCardsColor(cards);
});