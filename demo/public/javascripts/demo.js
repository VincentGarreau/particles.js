(function () {
    let otherLoads;

    if (window.onload) {
        otherLoads = window.onload;
    }

    const stats = new Stats();

    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";

    let updateStats = function () {
        const count_particles = document.querySelector(".js-count-particles");
        const update = function () {
            stats.begin();
            stats.end();
            if (tsParticles.domItem(0).particles.array) {
                count_particles.innerText = tsParticles.domItem(0).particles.array.length;
            }
            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    };

    let updateBackground = function () {
        const el = document.getElementById("tsparticles");
        const options = tsParticles.domItem(0).sourceOptions;
        const config = options.config_demo;
        let backgroundImage;

        if (config.background_image) {
            if (config.background_image.startsWith("url(")) {
                backgroundImage = config.background_image;
            } else {
                backgroundImage = `url('${config.background_image}')`;
            }
        } else {
            backgroundImage = '';
        }

        el.style.backgroundColor = config.background_color;
        el.style.backgroundImage = backgroundImage;
        el.style.backgroundPosition = config.background_position;
        el.style.backgroundRepeat = config.background_repeat;
        el.style.backgroundSize = config.background_size;
    };

    let updateParticles = function (editor) {
        let presetId = localStorage.presetId || 'default';

        tsParticles.loadJSON('tsparticles', `/presets/${presetId}.json`).then((particles) => {
            localStorage.presetId = presetId;
            editor.set(particles.options);
            editor.expandAll();
            updateBackground();
            updateStats();
        });
    };

    window.onload = function () {
        if (otherLoads) {
            otherLoads();
        }

        const element = document.getElementById('editor');
        const options = {
            mode: 'tree',
            modes: ['code', 'form', 'text', 'tree', 'view', 'preview'], // allowed modes
            onError: function (err) {
                alert(err.toString())
            },
            onModeChange: function (newMode, oldMode) {
            },
            onChange: function () {
                updateBackground();
            }
        };
        const editor = new JSONEditor(element, options);

        const cmbPresets = document.getElementById('presets');

        cmbPresets.onchange = function () {
            localStorage.presetId = this.value;

            updateParticles(editor);
        };

        if (!localStorage.presetId) {
            localStorage.presetId = 'default';
        }

        cmbPresets.value = localStorage.presetId;
        cmbPresets.onchange();

        const btnUpdate = document.getElementById('btnUpdate');
        btnUpdate.onclick = function () {
            const particles = tsParticles.domItem(0);

            particles.options = editor.get();
            particles.refresh();

            updateBackground();
        };

        document.body.querySelector('#tsparticles-container').appendChild(stats.domElement);
    };
})();