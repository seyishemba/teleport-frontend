import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  apikey:any = "ea9c8ee6-1f92-4549-a34d-8e54538de64a"
  secret:any = "5003b550-a40b-463a-b0e3-af8d95d51972"
  encodedKeys ="ZWE5YzhlZTYtMWY5Mi00NTQ5LWEzNGQtOGU1NDUzOGRlNjRhOmIxZTNiZThhLTdjYWMtNGM3Yi1hYTJjLWMyNTVlYTkzOTRiMw=="
  connectionString = "https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id="+this.apikey+"&redirect_uri=http://localhost:3000/"
  token:any
  TokenFromUrl:any
  title = 'teleport-docusign';
  baseUrl = ""
  userAuth:any
  showModal:boolean = false

  toggleModal(){
    this.showModal = !this.showModal
  }

  DocusignApi = {
    auth: {
      getToken :()=>{
        window.location.href = this.connectionString;
      },
      getTokenFromUrl:(key:any)=>{
          var url_string = window.location.href; 
          var url = new URL(url_string);
          var code = url.searchParams.get(key);
          return code
      },
      initCode:()=>{
        let TokenFromUrl = this.DocusignApi.auth.getTokenFromUrl("TokenFromUrl");
        if(TokenFromUrl == null || TokenFromUrl == undefined || TokenFromUrl == ''){
          this.DocusignApi.auth.getLocalToken("TokenFromUrl")
        }else{
          this.token = TokenFromUrl
          this.DocusignApi.auth.saveTokenToLocal(TokenFromUrl)
        }
        this.DocusignApi.auth.verifyToken(TokenFromUrl)
      },
      getLocalToken:(key:any)=>{
          let TokenFromUrl:any = localStorage.getItem(key)
          this.token = TokenFromUrl
      },
      saveTokenToLocal:(TokenFromUrl:any)=>{
        localStorage.setItem("TokenFromUrl", TokenFromUrl)
      },
      verifyToken: (token:any)=>{
        // if this.token === valid{}else{}
          let params = this.DocusignApi.auth.getLocalToken("TokenFromUrl");
          var requestOptions:any = {
            method: 'GET',
            redirect: 'follow'
          };
          let urlparams = "?token=" + this.token
          fetch("http://localhost:3000/user_info" + urlparams, requestOptions)
            .then(response => response.text())
            .then((result:any) => this.DocusignApi.auth.userTokenData(result))
            .catch(error => console.log('error', error));
      },
      userTokenData: (token:any)=>{
        console.log(token)
        let userData = JSON.parse(token.body)
        localStorage.setItem("userTokenData", userData)
      },
      expireCode:()=>{  
      },
    },
    contracts: {
      getContracts:()=>{

      },
      getContractbyId:()=>{
          // returns contract status
      },
      createContract:()=>{
        // let contractParams = {}
      },
      sendContractbyEmail:()=>{

      }
    }

  }
}

