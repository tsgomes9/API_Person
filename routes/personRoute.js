const router = require('express').Router()
const Person = require('../models/Person')

//rotas

//POST - Cadastrar usuário
router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body

  if (!name) {
    res.status(422).json({ alert_error: 'Name cannot be empty!' })
  }

  const person = {
    name,
    salary,
    approved
  }

  try {
    await Person.create(person)

    res.status(201).json({ message: 'pessoa inserida com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Read - Leitura de dados
router.get('/', async (req, res) => {
  try {
    const people = await Person.find()

    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// GET pelo ID
router.get('/:id', async (req, res) => {
  //extrair dado da requisição com req.params <- por vir da URL
  const id = req.params.id

  try {
    const person = await Person.findOne({ _id: id })

    if (!person) {
      res.status(424).json({ message: 'usuario não encontrado' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//UPDATE - Atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { name, salary, approved } = req.body
  const person = {
    name,
    salary,
    approved
  }

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person)

    //se a quantidade de atualizações for =0
    if (updatePerson.matchedCount === 0) {
      res.status().json({ message: 'usuário não foi encontrado' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// DELETE - Apagar dados especificos

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const person = await Person.findOne({ _id: id })

  if (!person) {
    res.status(422).json({ message: 'usuário não foi encontrado' })
  }

  try {
    await Person.deleteOne({ _id: id })
    res.status(200).json({ message: 'usuário removido com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router
