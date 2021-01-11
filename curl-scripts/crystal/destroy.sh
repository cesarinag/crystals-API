curl --include "https://arcane-meadow-00738.herokuapp.com/crystals/${ID}" \
--include \
--request DELETE \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}"
echo
