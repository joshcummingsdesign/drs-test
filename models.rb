class UsersController < ApplicationController
  def show
    @user = User.find_by_sql("SELECT * FROM users WHERE username = '#{params[:username]}'")
  end
end
