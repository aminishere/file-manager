const API_BASE = 'http://localhost:8000';
function getToken(){
    return localStorage.getItem('token');
}

export async function apiRequest(path, {method = 'GET', body , isForm=false}= {}){
    const headers = {};
    if(!isForm){
        headers['Content-Type'] = 'application/json';
    }
    const token = getToken();
    if(token){
        headers['Authorization']=`Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE}${path}`, {
        method,
        headers,
        body : isForm ? body : body ? JSON.stringify(body): undefined, 
    });
    if(!response.ok){
        const text= await response.text();
        throw new Error(text || `HTTP ${response.status}`);
    }
    const contentType = response.headers.get('content-type') || '' ;
    if(contentType.includes('application/json')){
        returnresponse.json();
    }
    return response.text();

}