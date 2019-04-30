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

export const postUserInfo = async(userId, username, userPwd, nickname, qq, email, phoneNumber, question, answer, viewNumber, rawPwd, pwd1, pwd2) => {
    const config = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_id": userId,
            "user_pwd": rawPwd,
            "user_pwd1": pwd1,
            "user_pwd2": pwd2,
            "user_nick_name": nickname,
            "user_qq": qq,
            "user_email": email,
            "user_phone": phoneNumber,
            "user_question": question,
            "user_answer": answer,
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

export const registerUser = async(username, newPwd1, newPwd2) => {
    const config = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_name": username,
            "user_pwd": newPwd1,
            "user_pwd2": newPwd2
        })
    }

    try{
        const response = await fetch(
            "http://naicha-api.tcore.my/index.php/user/reg.html",
            config
        );

        return response;
        
    } catch(e) {
        console.log(e);
    }
}