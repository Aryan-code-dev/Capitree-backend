require('../db/connection');
const express = require('express');
const router = express.Router();
const Node = require('../models/nodes');
const Edge = require('../models/edges');
const User = require('../models/users');
const { models, Error } = require('mongoose');


router.get('/initialData',async(req,res) => {
    
    const owner = req.query.owner;
    const ns = await Node.find({owner:Number(owner)}).exec();
    const es = await Edge.find({owner:Number(owner)}).exec();
    let nodes = [];
    let edges = [];
    for (const node of ns) {
        n={
            id:node.nodeId,
            data:{label:node.label,returnType:node.returnType},
            height:node.height,
            width:node.width,
            position:{x:node.x, y:node.y},
            type:node.type,

        }
        nodes.push(n);

    }
    for(const edge of es){
        e = {
            id:edge.edgeId,
            label:edge.label,
            source:edge.source,
            target:edge.target,
            type:edge.type,
        }
        edges.push(e);
    }
    res.status(200).json({nodes: nodes, edges: edges});
});


module.exports = router;