@login_required
def manage_tasks(request, project_id):
    user = request.user
    proj = Project.objects.get(pk=project_id)
    logger.info('User %s managing tasks for project %s' % (user.username, proj.title))
    if user.is_authenticated:
        if user.has_perm('can_change_task'):
            if request.method == 'POST':

                userid = request.POST.get("userid")
                taskid = request.POST.get("taskid")

                user = User.objects.get(pk=userid)
                task = Task.objects.get(pk=taskid)


                task.users_assigned.add(user)
