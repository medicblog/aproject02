// @ts-check
import getTable from "./modules/gettable.js";
import checkTable from "./modules/checkTable.js";
import utils from "./modules/utils.js";
(function main() {
    if (typeof window !== 'object' || window.self !== window.top) {
        return;
    }
    window.addEventListener(
        'load',
        () => {
            try {
                const btn = document.getElementById('btn');
                const ulist = document.getElementById('ulist');
                const msg = document.getElementById('msg');
                if (!(
                    msg
                    && btn instanceof HTMLButtonElement
                    && ulist instanceof HTMLElement
                ))
                {
                    throw new Error('elements:failed');
                }
                const [min, max] = [100000, 10000000];                
                btn.addEventListener(
                    'mouseup',
                    () => {
                        msg.textContent = `ulist-code: ${utils.rnd(min, max)}`;
                        getTable('../data/table0.json')
                        .then((res) => {
                            if (checkTable(res))
                            {
                                let uls = [];
                                res.forEach((row) => {
                                    let lis = '';
                                    const E = Object.entries(row);
                                    for (const [k, v] of E) {
                                        lis += `<li><b>${k} :</b><span>${v}</span></li>`;
                                    }
                                    lis = `<ul>${lis}</ul>`;
                                    uls.push(lis);
                                });
                                ulist.innerHTML = '';
                                ulist.insertAdjacentHTML(
                                    `beforeend`,
                                    uls.join('')
                                );                        
                            }
                        })
                        .catch((err) => {
                            msg.textContent = `${err.message}`;
                        });
                    },
                    false
                );
            } catch(err) {
                console.error(err.message);
            }
        },
        {
            once: true
        }
    );
})();
