export const fetchVideos = async() => {
    try{
        const response = await fetch("https://ht.naicha6.com/api.php/provide/vod/?ac=detail");
        return response.json();
    } catch(e) {
        console.log(e);
    }
}

export const fetchCategory = async() => {
    try{
        const response = await fetch("https://ht.naicha6.com/api.php/provide/vod/?ac=list");
        return response.json();
    } catch(e) {
        console.log(e);
    }
}

export const fetchNovels = async() => {
    try{
        const response = await fetch("https://ht.naicha6.com/api.php/provide/art/?ac=detail");
        return response.json();
    } catch(e) {
        console.log(e);
    }
}

export const fetchUsers = async() => {
    try{
        const response = await fetch("http://naicha-api.tcore.my/api.php/provide/user/?ac=list");
        return response.json();
    } catch(e) {
        console.log(e);
    }
}

export const postUserInfo = async(userId, username, userPwd, nickname, qq, phoneNumber, question, answer, viewNumber, rawPwd, pwd1, pwd2) => {
    const config = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_id": "2841",
            "user_pwd": rawPwd,
            "user_pwd1": pwd1,
            "user_pwd2": pwd2,
            "user_nick_name": nickname,
            "user_qq": qq,
            "user_email": "som@testingemail.com",
            "user_phone": phoneNumber,
            "user_question": question,
            "user_answer": answer,
            "user_points": 1000,
            "user_invitation_code": "719036",
            "user_viewing_num": viewNumber
        })
    }
    try{
        const response = await fetch(
            "http://naicha-api.tcore.my/index.php/user/info.html?user_id="+ userId + "&u=" + username + "&p=" + userPwd,
            config
        );
        return response;
    } catch(e) {
        console.log(e);
    }
}