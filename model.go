func (d *Database) IsInstallationActiveByParams(ctx context.Context, params domain.AccountParams) error {
	var installation repoInstallations
	err := d.db.WithContext(ctx).Model(&repoInstallations{}).Scopes(filterInstallationsWithParams(params)).First(&installation, fmt.Sprintf("status = %v", "active")).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return domain.ErrInstallationNotFound
