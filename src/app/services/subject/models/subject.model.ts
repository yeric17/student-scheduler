
export type SubjectResponse = {
    subjectAssignmentId:string
    subjectId:string
    subjectName:string
    teacherId:string
    teacherName:string
    studentsCount:number
    image:string
    isEnrolled:boolean
}

export type SubjectDerailedResponse = {
    subjectAssignmentId:string
    subjectId:string
    subjectName:string
    teacherId:string
    teacherName:string
    studentsCount:number
    image:string
    isEnrolled:boolean
    students:Student[]
}

export type Student = {
    userId:string
    fullName:string
}