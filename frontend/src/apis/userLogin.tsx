import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface RequestLoginMobile {
    email: string;
    password: string;
}
interface ResponseGetUser{
    data: {
      accessToken:string;
    },
    error: {
      status : string
    }
}
  interface ApiResponse {
    data?: {
      Medical: number;
      Vacation: number;
      Casual : number,
      Official : number,
      Exam : number,
      Higherstudy : number,
      Others : number
    };
    error?: {
      message: string;
      code: number;
    };
  }
  interface LeaveInfo {
    date: number;
    month: number;
    year: number;
    reason: string;
    _id: string;
  }
  interface sendRequest{
    date: number;
    month: number;
    year: number;
    reason: string;
    reasonType:String
  }
interface ResponseSendRequest{
    message:String,
    error: {
      status : string
    }
  }
interface ShowLeaveRequest {
    name: string;
    date: number;
    month: number;
    year: number;
    id: string;
    _id: string;
    reason: string;
    reasonType:String
}
interface ApprovalRequest{
  _id:string
}
interface UserDetails{
  _id:string;
  email:String,
  password:String,
  role:String,
  id:String,
  department:String,
  name:String
}
interface LeaveRequest{
  year:number,
  month:number
}
interface LeaveYear{
  year:number,
  month:number
}
interface Response{
  message:string
} 

interface ShowLeaves {
  date : number;
  month: number;
  year: number;
  reason: string;
  reasonType:string
}
interface Todostatus {
  task:String,
  taskdescription:String
  status:String,
  department:String,
  name:String,
  id:String,
  _id:String
}
interface DepartmentStaff{
  _id:string;
  email:String,
  password:String,
  role:String,
  id:String,
  department:String,
  name:String
}
interface ChangeStatus{
  _id:String
}
interface SendTodos{
  task:String;
  taskdescription:String,
  User:{
    _id:string;
    email:String,
    password:String,
    role:String,
    id:String,
    department:String,
    name:string
  }[];
}

export const userLogin = createApi({
    reducerPath:"userLogin",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('accessToken');
      headers.set('authorization',`Bearer ${token}`)
      return headers;
    },
  }),
    endpoints:(builder)=>({    
        loginUser : builder.mutation<ResponseGetUser, RequestLoginMobile>({
            query: (payload) => ({
              url: `/`,
              body: payload,
              method: 'POST'
            })
          }),
        userLeaveDetails : builder.mutation<ApiResponse,LeaveYear>({
            query: (payload) => ({
              url: `/leavedetails/leavecount`,
              body: payload,
              method: 'POST'
            })
          }),
        userLeave : builder.mutation<LeaveInfo[],LeaveRequest>({
            query: (payload) => ({
              url: `/leavedetails`,  
              body: payload,
              method: 'POST'
            })
        }),
        sendRequest : builder.mutation<ResponseSendRequest,sendRequest>({
          query: (payload) => ({
            url: `/leaverequest/sendleaverequest`,
            body: payload,
            method: 'POST'
          })
      }),
      showLeaveRequest : builder.query<ShowLeaveRequest[],void>({
        query: (payload) => ({
          url: `/leaverequest`,
          body: payload
        })
    }),
      approvalLeaveRequest : builder.mutation<ResponseSendRequest,ApprovalRequest>({
        query: (payload) => ({
          url: `/leaverequest/approvalleaverequest`,
          body: payload,
          method: 'POST'
        })
    }),
    declineLeaveRequest : builder.mutation<ResponseSendRequest,ApprovalRequest>({
      query: (payload) => ({
        url: `/leaverequest/declineleaverequest`,
        body: payload,
        method: 'POST'
      })
  }),
  userDetails : builder.query<UserDetails[],void>({
      query: (payload) => ({
        url: `/users`
      })
  }),
  adduser : builder.mutation<Response,UserDetails>({
    query: (payload) => ({
      url: `/adduser`,
      body: payload,
      method: 'POST'
    })
  }),
  deleteuser : builder.mutation<Response,{_id:string}>({
    query: (payload) => ({
      url: `/deleteuser`,
      body: payload,
      method: 'POST'
    })
  }),
  updateuser : builder.mutation<Response,UserDetails>({
    query: (payload) => ({
      url: `/updateuser`, 
      body: payload,
      method: 'POST'
    })
  }),
  userLeaves : builder.query<ShowLeaves[],void>({
    query: (payload) => ({
      url: `/leavedetails`
    })
  }),
  todostatus : builder.query<Todostatus[],void>({
    query: (payload) => ({
      url: `/todos/status`
    })
  }),
  todouser : builder.query<DepartmentStaff[],void>({
    query: (payload) => ({
      url: `/todos/user`
    })
  }),
  todo : builder.query<Todostatus[],void>({
    query: (payload) => ({
      url: `/todos`
    })
  }),
  todochangestatus : builder.mutation<Response , ChangeStatus>({
    query: (payload) => ({
      url: `/todos/changestatus`,
      body: payload,
      method: 'POST'
    })
  }),
  todosendtodos : builder.mutation<Response , SendTodos>({
    query: (payload) => ({
      url: `/todos/sendtodos`,
      body: payload,
      method: 'POST'
    })
  }),
  }),   
})  
export const { useLoginUserMutation , 
  useUserLeaveDetailsMutation,useUserLeaveMutation,useSendRequestMutation,
  useShowLeaveRequestQuery,useApprovalLeaveRequestMutation,useUserDetailsQuery,
  useDeclineLeaveRequestMutation,useAdduserMutation,useDeleteuserMutation,
  useUpdateuserMutation,useUserLeavesQuery,useTodostatusQuery,useTodouserQuery,useTodoQuery,useTodochangestatusMutation,useTodosendtodosMutation
} = userLogin;