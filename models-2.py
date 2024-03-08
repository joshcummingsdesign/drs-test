 curs = connection.cursor()
            curs.execute(
                f’insert into taskManager_file (name,path,project_id) values {name}, {upload_path}, {project_id}‘)

