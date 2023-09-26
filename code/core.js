
let arr = []; //raspunsuri utilizator
let true_ans = []; //raspunsuri reale

const conv_letter = (l) => {
    if(l == "A") return 0;
    else if(l == "B") return 1;
    else if(l == "C") return 2;
    return 3;
}

const conv_j = (l) => {
    if(l == 0) return "A";
    else if(l == 1) return "B";
    else if(l == 2) return "C";
    return "D";
}

const init_true_ans = (answers) => {
    answers.map((el,index) => {
        let true_in = index + 1;
        true_ans[true_in] = [];

        for(let k = 0; k < 4; k++)
            true_ans[true_in][k] = false;

        el.map((ans) => {
            let c = conv_letter(ans);
            true_ans[true_in][c] = true;
        })
    })
}

const init_form = (d) => {
    for(let i = 1; i <= nr_intrebari; i++){
        arr[i] = [];

        for(let j = 0; j < 4; j++) {
            arr[i][j] = false;
        }

    d.getElementById("formx").innerHTML += `
        <div class="dist alg" id="${i}">
            <h1>${i}</h1>
            <div class="align">
                <p class="control">
                    <a id="A${i}" class="button tt">
                        A
                    </a>
                </p>
                <p class="control">
                    <a id="B${i}" class="button tt">
                        B
                    </a>
                </p>
                <p class="control">
                    <a id="C${i}" class="button tt">
                        C
                    </a>
                </p>
                <p class="control">
                    <a id="D${i}" class="button tt">
                        D
                    </a>
                </p>
            </div>
        </div>
        `
    }
}

const init_btn_event = (all_btns) => {
    all_btns.map((el) => {
        el.addEventListener("click", () => {
            if(el.style.background == "gray")
                el.style.background = "white";
            else el.style.background = "gray";

            console.log(el.id);
            let letter = el.id[0], num = el.id.substring(1);
            letter = conv_letter(letter);

            arr[num][letter] = !arr[num][letter];

            console.log(arr[num][letter]);
        })
    })
}

let max = (a,b) => {
    if(a>b) return a;
    return b;
}


const calculate = () => {
    let initial = punctaj, pt_grila = maxim;
    let msgbody = "";

    for(let i = 1; i<= nr_intrebari; i++){
        let gresite = 0, ratate = 0, corecte = 0;

        let imsg = "";

        for(let j = 0; j < 4; j++){
            if(true_ans[i][j] == arr[i][j] && arr[i][j] == true) {
                corecte++;
            }
            else if(true_ans[i][j] == true && arr[i][j] == false) {
                ratate++;
                let rl = conv_j(j);
                imsg += `Nu ai bifat litera ${rl}\n`
            }
            else if(true_ans[i][j] == false && arr[i][j] == true) {
                gresite++;
                let wl = conv_j(j);
                imsg += `Ai bifat incorect litera ${wl}\n`
            }
        }

        let totale = corecte + ratate;

        console.log(corecte, ratate,gresite);

        let penalizare = gresite * 0.66 * pt_grila /(totale);
        let castigat = corecte * pt_grila / totale;

        castigat = max(0, castigat - penalizare);

        if(castigat != pt_grila){
            msgbody += `${i}:\n${imsg}\n`;
        }

        initial += castigat;
    }

    initial = Number(initial).toFixed(2); //2 zecimale
    msgbody = `Punctaj ${initial}\n\n` + msgbody;

    alert(msgbody);
}