let selections = [];

document.querySelectorAll('.selection.color-selectable').forEach(item => {
    item.addEventListener('click', function() {
        const clothingItem = this;
        const modal = document.getElementById('colorModal');
        const span = document.getElementsByClassName("close")[0];
        const saveBtn = document.getElementById('saveColor');
        
        modal.style.display = "block";
        
        span.onclick = function() {
            modal.style.display = "none";
        }
        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        
        saveBtn.onclick = function() {
            const color = document.getElementById('colorSelection').value;
            selections.push({ item: clothingItem.textContent, color: color });
            console.log(selections);
            clothingItem.innerHTML += `<div style='color:${color};'>${color}</div>`;
            modal.style.display = "none";
        }
    });
});
