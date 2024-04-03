import api from './api';

class family{
    getAll(){
        return api.get("/family");
    }
    create(data){
        return api.post('/family', data);
    }
    delete(id){
        return api.delete(`/family/${id}`);
    }
    update(id, data){
        return api.put(`/family/${id}`, data);
    }
};

export default new family();