 $(document).ready(function(){
     $("#signout-button").click(function(){
   if(confirm("정말 탈퇴하시겠습니까?"))
    {
        $.ajax({
            url: serverip+"/cafe/sign_out",
            method:"POST",
            data: null,
             success: function(data){
              window.location = "/cafe/main.html"
            }
         
     })
    }
     else
     {
            return ;
     }

      })
 });