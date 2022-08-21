export const getMessage = async ()=>{
    const req = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await req.json();
    return data['value'];
}