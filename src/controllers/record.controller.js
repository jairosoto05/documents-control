recordCtrl = {}

const { Document, Record, User } = require('../models');

// create a new record
recordCtrl.create = async (req, res) => {
    const { DocumentId, UserId } = req.body;
    const record = await Record.create({
        DocumentId,
        UserId,
    });
    res.json(record);
}

// get all records
recordCtrl.getAll = async (req, res) => {
    const records = await Record.findAll();
    res.json(records);
}

// get a record by id
recordCtrl.getById = async (req, res) => {
    const { id } = req.params;
    const record = await Record.findByPk(id,{
        include: [
            {
                model: Document,
                as: 'document',
                attributes: ['Number', 'Name', 'Plate'],
            },
            {
                model: User,
                as: 'user',
                attributes: ['Name', 'Department']
            }
            ]
    });
    res.json(record);
}

// update a record
recordCtrl.update = async (req, res) => {
    const { id } = req.params;
    const { UserId } = req.body;
    const record = await Record.findByPk(id);
    await record.update({
        UserId
    });
    res.json(record);
}

// delete a record
recordCtrl.delete = async (req, res) => {
    const { id } = req.params;
    const record = await Record.findByPk(id);
    await record.destroy();
    res.json(record);
}

module.exports = recordCtrl;