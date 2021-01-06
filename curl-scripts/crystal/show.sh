curl --include "http://localhost:4741/crystals/${ID}" \
--include \
--request GET \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}"
echo
