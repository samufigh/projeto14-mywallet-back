

export async function transaction(req, res){
    try {
        
        res.send("foi");
    } catch (err){
        res.status(500).send(err.message);
    }
}