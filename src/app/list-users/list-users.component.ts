import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";
import { UserService } from '../services/user.service';
import { AdduserComponent } from '../adduser/adduser.component';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

    users?:User[];
    selection :any[]=[];
    filtre:string="";
    cuser=new User();

    constructor(private userService:UserService,private addUser:AdduserComponent) { }

    ngOnInit(): void {
      this.users=[];
      this.selection=[];
      this.readMyUsers();
    }
    readMyUsers()
    {
      this.userService.readUser().pipe( map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id,
            ...c.payload.doc.data() as {} })
        )
      )
    ).subscribe(data => {
      this.users = data;
    }
    );
    }
    adddel(id:any)
    {
      this.selection?.push(id);

    }
    deleteAdll()
    {
      for (let uid of this.selection)
      {
        this.userService.deleteUser(uid);



      }
      this.selection=[];
    }
    deleteOne(id:any)
    {
      if(confirm("vous êtes sûre de vouloire supprimer"))
      {
        this.userService.deleteUser(id);
      }
    }
  selectit(us:User)
  {
    this.cuser=us;
   // localStorage.setItem("current",JSON.stringify(this.cuser));
    this.addUser.detectUser(this.cuser);
  }
  }




