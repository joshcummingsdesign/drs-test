# Update the found_by field to remove Acunetix360 and add Acunetix
def update_parser_finding(finding, newparser_test_type, parser_test_type) -> None:
    # Check if nessus is in found by list and remove
    if parser_test_type in finding.found_by.all():
        finding.found_by.remove(parser_test_type.id)
    # Check if tenable is already in list somehow before adding it
    if newparser_test_type not in finding.found_by.all():
        finding.found_by.add(newparser_test_type.id)
    finding.save()
