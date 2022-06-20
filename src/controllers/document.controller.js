documentCtrl={}

const { Op } = require('sequelize');
const { Document, Record, User } = require('../models');

// create a new document
documentCtrl.create = async (req, res) => {
    const { Number, Name, Plate } = req.body;
    const document = await Document.create({
        Number,
        Name,
        Plate
    });
    const records = await Record.create({
        DocumentId: document.dataValues.id,
        UserId: req.body.Record.UserId,
    });
    res.json(document);
}

// get all documents
documentCtrl.getAll = async (req, res) => {
    const documents = await Document.findAll();
    res.json(documents);
}

// get a document by id
documentCtrl.getById = async (req, res) => {
    const { id } = req.params;
    const document = await Document.findByPk(id,{
        include: [
            {
                model: Record,
                as: 'records',
                attributes: ['createdAt'],
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['Name', 'Department']
                    }
                ]
            }
        ]
    });
    res.json(document);
}

// update a document
documentCtrl.update = async (req, res) => {
    const { id } = req.params;
    const { number, name, plate } = req.body;
    const document = await Document.findByPk(id);
    await document.update({
        number,
        name,
        plate
    });
    res.json(document);
}

// delete a document
documentCtrl.delete = async (req, res) => {
    const { id } = req.params;
    const document = await Document.findByPk(id);
    await document.destroy();
    res.json("message: Document deleted successfully");
}

module.exports = documentCtrl;