curl "https://arcane-meadow-00738.herokuapp.com/crystals/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "crystal": {
      "name": "'"${NAME}"'",
      "chakra": "'"${CHAKRA}"'",
      "indigenousTo": "'"${FROM}"'",
      "ritualUse": "'"${USE}"'"
    }
  }'
echo
