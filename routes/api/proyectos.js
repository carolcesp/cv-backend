const router = require('express').Router();
const { check, validationResult} = require('express-validator');


const Proyecto = require('../../models/proyecto');

router.get('/', async (req, res) => {
    console.log(req.payload);
    try {
        const proyectos = await Proyecto.find()
        res.json(proyectos);

    } catch (err) {
        res.status(503).json({ 'error': err });
    }
});

router.get('/categoria:categoria', async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ categoria: req.params.categoria})
        res.json(proyectos);

    } catch (err) {
        res.status(503).json({ 'error': err });
    }
});

router.get('/:idProyecto', async (req, res) => {
    try {
        const proyecto = await Proyecto.findById(req.params.idProyecto)
        res.json(proyecto);

    } catch (err) {
        res.status(503).json({ 'error': err });
    }
});

router.post('/', [
    check('titulo', 'El titulo debe incluirse en la petición y tiene un máximo de 40 caracteres')
        .exists()
        .notEmpty()
        .isLength({max: 40}),
    check('descripcion', 'La descripción debe incluirse en la petición y tiene un máximo de 300 caracteres')
        .exists()
        .notEmpty()
        .isLength({max: 300}),
    check('url', 'La URL del proyecto debe estar corretca')
        .isURL()

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    // modelo base de datos importado
    try {
        const nuevoProyecto = await Proyecto.create(req.body)
        res.json(nuevoProyecto);
    } catch (err) {
        res.status(503).json({ 'error': err });
    }
})

router.put('/:proyectoId', async (req, res) => {
    try {
        const proyectoEditado = await Proyecto.findByIdAndUpdate(req.params.proyectoId, req.body, {new: true});
        res.json(proyectoEditado)
    } catch (err) {
        res.status(503).json({ 'error': err });
    }
});

router.delete('/:proyectoId', async (req, res) => {
    try {
        const proyectoBorrado = await Proyecto.findByIdAndDelete(req.params.proyectoId);
        rest.json(proyectoBorrado)
    } catch (err) {
        res.status(503).json({ 'error': err });
    }
})

module.exports = router;