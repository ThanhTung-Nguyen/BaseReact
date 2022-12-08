export const GET_ALL_FACILITYTYPE = `
query facilityTypes($page: Int,$pageSize: Int,$sorted: [SortedInput],$filtered: [FilteredInput]){
  facilityTypes(page: $page, pageSize: $pageSize, sorted: $sorted, filtered: $filtered){
    code,
    data{
      id,
      name,
      status,
      createDate,
      createUser
    },
    message,
    page,
    pages,
    records
  }
}`

export const GET_DETAIL_FACILITYTYPE = ``

export const SAVE_FACILITYTYPE = `
mutation saveFacilityType($data: FacilityTypeInput){
  saveFacilityType(data: $data){
    code,
    data{
      id,
      name,
      createDate,
      createUser
    },
    message
  }
}`

export const REMOVE_FACILITYTYPE = `
mutation deleteFacilityType($id: String!){
  deleteFacilityType(id: $id){
    code,
    data,
    message
  }
}`
