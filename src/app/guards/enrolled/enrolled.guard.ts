import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EnrollmentService } from '../../services/enrollment/enrollment.service';
import { firstValueFrom } from 'rxjs';

export const enrolledGuard: CanActivateFn = async (route, state) => {
  const enrollmentService = inject(EnrollmentService)
  const router = inject(Router)

  const id = route.params['id']

  
  const enrollments = await firstValueFrom(enrollmentService.GetMyEnrollments())


  if(!enrollments.some((enrollment) => enrollment.subjectAssignmentId === id)){
    return router.navigate(['app']);
  }
  
  return true;
};
