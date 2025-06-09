// @ts-check
import getTable from "./modules/gettable.js";
import checkTable from "./modules/checkTable.js";

(function main() {
    if (typeof window !== 'object' || window.self !== window.top) {
        return;
    }
    window.addEventListener(
        'load',
        () => {
            try {
                const btn = document.getElementById('btn');
                const msg = document.getElementById('msg');
                const img = document.getElementById('img');
                if (!(
                    msg
                    && btn instanceof HTMLButtonElement
                    && img instanceof HTMLImageElement                    
                ))
                {
                    throw new Error('elements:failed');
                }

                const limit = 20;
                const API_URL = `https://api.thecatapi.com/v1/images/search?limit=${limit}`;

                getTable(API_URL)
                .then((res) => {
                    msg.textContent =  `check table : ${checkTable(res)}`;

                    let i = -1;

                    btn.addEventListener(
                        'mouseup',
                        (e) => {
                            e.stopPropagation();

                            i++;
                            
                            if (i > limit - 1) {
                                i = 0;
                            }

                            if (res[i] && Object.hasOwn(res[i], 'url'))
                            {
                                img.src = `${res[i].url}`;
                            }
                        },
                        false
                    );
                })
                .catch((err) => {
                    msg.textContent = `${err.message}`;
                });
            } catch(err) {
                console.error(err.message);
            }
        },
        {
            once: true
        }
    );
})();
