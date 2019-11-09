function popupSenha(acao){
    if(acao){
        document.getElementById("janela_popup_senha").style.display="block";
        document.getElementById("login_form_popup").style.display="none";
    }else{
        document.getElementById("janela_popup_senha").style.display="none";
    }
}

function popupLogin(acao){
    if(acao){
        document.getElementById("login_form_popup").style.display="block";
    }else{
        document.getElementById("login_form_popup").style.display="none";
    }
}

function popupCadastro(acao){
    if(acao){
        document.getElementById("cadastro_form_popup").style.display="block";
    }else{
        document.getElementById("cadastro_form_popup").style.display="none";
    }
}

function AssistChat(acao){
    if(acao){
        document.getElementById("popupChatDiv").style.display="block";
    }else{
        document.getElementById("popupChatDiv").style.display="none";
    }
}

function servicoPet(acao,id){
    if(acao){
        document.getElementById(id).style.display="block";
    }else{
        document.getElementById(id).style.display="none";
    }
}