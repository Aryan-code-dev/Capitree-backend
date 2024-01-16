require('../db/connection');
const express = require('express');
const router = express.Router();
const Node = require('../models/nodes');
const Edge = require('../models/edges');
const User = require('../models/users');
const { models, Error } = require('mongoose');

router.post('/localUpdate',async(req,res) => {

   
    const nodes = req.body.nodes;
    const edges = req.body.edges;
   
    try{
        //TODO: make owner dynamic
        const nodesIdsToKeep = nodes.map(node => node.id);
        const edgesIdsToKeep = edges.map(edge => edge.id);

        // Delete nodes that are not in the nodesIdsToKeep array
        await Node.deleteMany({ nodeId: { $nin: nodesIdsToKeep }, owner: 1 });

        // Delete edges that are not in the edgesIdsToKeep array
        await Edge.deleteMany({ edgeId: { $nin: edgesIdsToKeep }, owner: 1 });

        for(let i=0;i<nodes.length;i++) {
            // console.log(nodes[i])
            const filter = { nodeId: nodes[i].id, owner: 1};
            const update = { type:nodes[i].type,returnType: nodes[i].data.returnType, label: nodes[i].data.label, height: nodes[i].height, width: nodes[i].width, x: nodes[i].position.x, y: nodes[i].position.y};


            let node = await Node.updateOne(filter,update);
            
            if(node.matchedCount == 0){
                await Node.create({nodeId: nodes[i].id, owner: 1,type:nodes[i].type,returnType: nodes[i].data.returnType,label: nodes[i].data.label, height: nodes[i].height, width: nodes[i].width, x: nodes[i].position.x, y: nodes[i].position.y})
            }
            
        }
        for(let i=0;i<edges.length;i++){
            const filter = { edgeId: edges[i].id, owner: 1};
            const update = { type:edges[i].type, label: edges[i].label, source: edges[i].source, target: edges[i].target};
            

            let edge = await Edge.updateOne(filter, update);
            if(edge.matchedCount == 0){
                await Edge.create({edgeId: edges[i].id, owner: 1, type:edges[i].type, label: edges[i].label, source: edges[i].source, target: edges[i].target})
            }
        }
        
    

        
        return res.status(200).json({ message: 'Updated' });
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;