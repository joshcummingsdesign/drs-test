def download
  begin
    path = Rails.root.join('public', 'docs', params[:name])
    file = params[:type].constantize.new(path)
    send_file file, :disposition => 'attachment'
  rescue
    redirect_to user_benefit_forms_path(:user_id => current_user.user_id)
  end
end
