
const questions = [

    {
        q: "¿En qué tipo de triángulo se aplica el teorema de Pitágoras?",
        a: ["Triángulo equilátero", "Triángulo rectángulo", "Cualquier triángulo", "Triángulo obtusángulo"],
        c: 1,
        e: "Se aplica a los triángulos que tienen un ángulo recto de 90°."
    },

    {
        q: "¿Cuál es la fórmula del teorema de Pitágoras?",
        a: ["a + b = c", "a² + b² = c²", "a² − b² = c²", "a × b = c"],
        c: 1,
        e: "La suma de los cuadrados de los catetos es igual al cuadrado de la hipotenusa."
    },

    {
        q: "Si los catetos miden 3 cm y 4 cm, ¿cuánto mide la hipotenusa?",
        a: ["5 cm", "6 cm", "7 cm", "12 cm"],
        c: 0,
        e: "3² + 4² = 9 + 16 = 25. La raíz cuadrada de 25 es 5."
    },

    {
        q: "¿Cómo se llama el lado más largo del triángulo rectángulo?",
        a: ["Cateto menor", "Altura", "Hipotenusa", "Base"],
        c: 2,
        e: "La hipotenusa está frente al ángulo recto y es el lado más largo."
    },

    {
        q: "Si la hipotenusa mide 13 cm y un cateto 5 cm, ¿cuánto mide el otro cateto?",
        a: ["8 cm", "10 cm", "12 cm", "18 cm"],
        c: 2,
        e: "13² − 5² = 169 − 25 = 144. La raíz cuadrada de 144 es 12."
    },

    {
        q: "Un triángulo tiene catetos de 6 cm y 8 cm. ¿Cuál es su hipotenusa?",
        a: ["9 cm", "10 cm", "12 cm", "14 cm"],
        c: 1,
        e: "6² + 8² = 36 + 64 = 100. La raíz cuadrada de 100 es 10."
    }

];

let index = 0;
let score = 0;
let locked = false;

const $ = id => document.getElementById(id);

// Mostrar pregunta

function render() {

    locked = false;

    $("count").textContent =
        `Pregunta ${index + 1} de ${questions.length}`;

    $("points").textContent = `★ ${score} puntos`;

    $("bar").style.width =
        `${index / questions.length * 100}%`;

    $("question").textContent = questions[index].q;

    $("feedback").textContent = "";
    $("feedback").className = "feedback";

    $("next").classList.add("hidden");

    $("answers").innerHTML = "";

    questions[index].a.forEach((answer, i) => {

        const button = document.createElement("button");

        button.className = "answer";

        button.textContent =
            `${String.fromCharCode(65 + i)}. ${answer}`;

        button.onclick = () => choose(i, button);

        $("answers").appendChild(button);

    });

}

// Validar respuesta

function choose(i, button) {

    if (locked) return;

    locked = true;

    const item = questions[index];

    [...$("answers").children].forEach((b, j) => {

        b.disabled = true;

        if (j === item.c) {
            b.classList.add("correct");
        }

    });

    if (i === item.c) {

        score++;

        $("feedback").className = "feedback success";

        $("feedback").textContent =
            "✓ ¡Excelente! Respuesta correcta. " + item.e;

    } else {

        button.classList.add("wrong");

        $("feedback").className = "feedback error";

        $("feedback").textContent =
            "✕ Respuesta incorrecta. " + item.e;

    }

    $("points").textContent = `★ ${score} puntos`;

    $("next").textContent =
        index === questions.length - 1
        ? "Ver mis resultados →"
        : "Siguiente pregunta →";

    $("next").classList.remove("hidden");

}

// Siguiente pregunta

$("next").onclick = () => {

    index++;

    if (index < questions.length) {

        render();

    } else {

        finish();

    }

};

// Mostrar resultados

function finish() {

    $("quiz").classList.add("hidden");

    $("result").classList.remove("hidden");

    $("bar").style.width = "100%";

    $("finalScore").textContent =
        `${score}/${questions.length}`;

    $("message").textContent =
        score === 6
        ? "¡Excelente! Dominas completamente el teorema de Pitágoras. 🎉"
        : score >= 4
        ? "¡Muy buen trabajo! Tienes buenos conocimientos. Sigue practicando. ⭐"
        : "¡Buen intento! Repasa la fórmula y vuelve a intentarlo. 💪";

}

// Reiniciar actividad

function restart() {

    index = 0;
    score = 0;

    $("result").classList.add("hidden");

    $("quiz").classList.remove("hidden");

    render();

}

// Conectar botón de reinicio

$("restart").addEventListener("click", restart);

// Iniciar actividad

render();
