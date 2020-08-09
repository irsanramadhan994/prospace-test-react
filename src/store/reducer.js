import Axios from "axios";
import { act } from "react-dom/test-utils";

const initialState = {
  counter: 0,
  results: [],
  company: [],
  action: "",
  modals: [
      {
        modals_name:'',
        modals_message:'',
        modals_show: false,
        modals_index:'',
        modals_company_name: ''

      }
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_COMPANY":
      Axios.post(
        `http://localhost:3200/api/user/`,
        action.payload
      ).then((res) => {


      });
      return {
        ...state,
        action: "create",
        modals: [{
            modals_name:'COMPANY',
            modals_message:'Company Successfully Created',
            modals_show: true,
            modals_index:'',
            modals_company_name: ''

        }]
      };




    case "CREATE_OFFICE":
      Axios.post(
        `http://localhost:3200/api/user/office`,
        action.payload
      ).then((res) => {});

      return {
        ...state,
        action: "create",
        modals: [{
            modals_name:'OFFICE',
            modals_message:'OFFICE Successfully Created',
            modals_show: true,
            modals_index: '',
            modals_company_name: ''

        }]
      };


      case "MODAL_CLOSE":

          return {
              ...state,
              modals:[
                {
                  modals_name:'',
                  modals_message:'',
                  modals_index:'',
                  modals_show: false,
                  modals_company_name: ''
                }
            ]
          }


        case "MODAL_DELETE_COMPANY":
        console.log(action.payload)
        let delOfficeIndex = state.company.findIndex(s=>s.company_id == action.index)

            return {
                ...state,
                modals:[
                  {
                    modals_name:'DELETE COMPANY',
                    modals_message:'Are you sure want to delete '+ state.company[delOfficeIndex].company_name+" ?",
                    modals_show: true,
                    modals_index: action.index,
                    modals_company_name: ''
                  }
              ]
            }

            
        case "MODAL_DELETE_OFFICE":
            console.log(action.payload)
            let delCompanyIndex = state.company.findIndex(s=>s.company_name == action.payload.company)
    
                return {
                    ...state,
                    modals:[
                      {
                        modals_name:'DELETE OFFICE',
                        modals_message:'Are you sure want to delete '+ state.company[delCompanyIndex].company_name+" ?",
                        modals_show: true,
                        modals_index: action.index,
                        modals_company_name : action.payload
                      }
                  ]
                }




    case "DELETE_OFFICE":
        console.log(action.index)
        console.log(action.payload)
      Axios.delete(`http://localhost:3200/api/user/office/` + action.index, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: action.payload,
      }).then((res) => {
      });

      return {
        ...state,
        action: "delete",
        company: state.company[0].office.filter(s=> s.office_id !== action.index),
        modals:[
            {
              modals_name:'',
              modals_message:'',
              modals_index:'',
              modals_show: false,
              modals_company_name: ''

            }
        ]
      };

    case "STORE_COMPANY":
      return {
        ...state,
        company: action.payload,
        action: "store",
      };

    case "DELETE_COMPANY":
      Axios.delete(`http://localhost:3200/api/user/` + action.index).then(
        (res) => {
        }
      );

      return {
        ...state,
        action: "delete",
        modals:[
            {
              modals_name:'',
              modals_message:'',
              modals_index:'',
              modals_show: false,
              modals_company_name: ''

            }
        ]
    
      };

    default:
      return state;
  }
};

export default reducer;
