module.exports = {
  activityTypes
}

const activityTypes = {
  Accept: {
    uri: `https://www.w3.org/ns/activitystreams#Accept`,
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally accepted an invitation to a party",
        "type": "Accept",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Invite",
          "actor": "http://john.example.org",
          "object": {
            "type": "Event",
            "name": "Going-Away Party for Jim"
          }
        }
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally accepted Joe into the club",
        "type": "Accept",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Person",
          "name": "Joe"
        },
        "target": {
          "type": "Group",
          "name": "The Club"
        }
      }
    ],
    notes: "Indicates that the actor accepts the object. The target property can be used in certain circumstances to indicate the context into which the object has been accepted.",
    extends: "Activity",
  // Properties:	Inherits all properties from Activity.
  },
  TentativeAccept: {
    uri: `https://www.w3.org/ns/activitystreams#TentativeAccept`,
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally tentatively accepted an invitation to a party",
        "type": "TentativeAccept",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Invite",
          "actor": "http://john.example.org",
          "object": {
            "type": "Event",
            "name": "Going-Away Party for Jim"
          }
        }
      }
    ],
    notes: `A specialization of Accept indicating that the acceptance is tentative.`,
    extends: 'Accept'
  //Properties:	Inherits all properties from Accept.
  },
  Add: {
    uri: `https://www.w3.org/ns/activitystreams#Add`,
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally added an object",
        "type": "Add",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/abc"
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally added a picture of her cat to her cat picture collection",
        "type": "Add",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Image",
          "name": "A picture of my cat",
          "url": "http://example.org/img/cat.png"
        },
        "origin": {
          "type": "Collection",
          "name": "Camera Roll"
        },
        "target": {
          "type": "Collection",
          "name": "My Cat Pictures"
        }
      }
    ],
    notes: "Indicates that the actor has added the object to the target. If the target property is not explicitly specified, the target would need to be determined implicitly by context. The origin can be used to identify the context from which the object originated.",
    extends: 'Activity',
  //Properties:	Inherits all properties from Activity.
  },
  Arrive: {
    uri: `https://www.w3.org/ns/activitystreams#Arrive`,
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally arrived at work",
        "type": "Arrive",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "location": {
          "type": "Place",
          "name": "Work"
        },
        "origin": {
          "type": "Place",
          "name": "Home"
        }
      }
    ],
    notes: "An IntransitiveActivity that indicates that the actor has arrived at the location. The origin can be used to identify the context from which the actor originated. The target typically has no defined meaning.",
    extends: 'IntransitiveActivity',
  //Properties:	Inherits all properties fom IntransitiveActivity.
  },

  Create: {
    uri: `https://www.w3.org/ns/activitystreams#Create`,
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally created a note",
        "type": "Create",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Note",
          "name": "A Simple Note",
          "content": "This is a simple note"
        }
      }
    ],
    notes: `Indicates that the actor has created the object.`,
    extends: 'Activity',
  //Properties:	Inherits all properties from Activity.
  },
  Delete: {
    uri: `https://www.w3.org/ns/activitystreams#Delete`,
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally deleted a note",
        "type": "Delete",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/notes/1",
        "origin": {
          "type": "Collection",
          "name": "Sally's Notes"
        }
      }
    ],
    notes: `Indicates that the actor has deleted the object. If specified, the origin indicates the context from which the object was deleted.`,
    extends: 'Activity',
  //Properties:	Inherits all properties from Activity.
  },
  Follow: {
    uri: 'https://www.w3.org/ns/activitystreams#Follow',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally followed John",
        "type": "Follow",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Person",
          "name": "John"
        }
      }
    ],
    notes: `Indicates that the actor is "following" the object. Following is defined in the sense typically used within Social systems in which the actor is interested in any activity performed by or on the object. The target and origin typically have no defined meaning.`,
    extends: `Activity`,
  //Properties:	Inherits all properties from Activity.
  },

  Ignore: {
    uri: 'https://www.w3.org/ns/activitystreams#Ignore',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally ignored a note",
        "type": "Ignore",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/notes/1"
      }
    ],
    notes: `Indicates that the actor is ignoring the object. The target and origin typically have no defined meaning.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Join: {
    uri: 'https://www.w3.org/ns/activitystreams#Join',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally joined a group",
        "type": "Join",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Group",
          "name": "A Simple Group"
        }
      }
    ],
    notes: `Indicates that the actor has joined the object. The target and origin typically have no defined meaning.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Leave: {
    uri: 'https://www.w3.org/ns/activitystreams#Leave',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally left work",
        "type": "Leave",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Place",
          "name": "Work"
        }
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally left a group",
        "type": "Leave",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Group",
          "name": "A Simple Group"
        }
      }
    ],
    notes: `Indicates that the actor has left the object. The target and origin typically have no meaning.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Like: {
    uri: 'https://www.w3.org/ns/activitystreams#Like',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally liked a note",
        "type": "Like",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/notes/1"
      }
    ],
    notes: `Indicates that the actor likes, recommends or endorses the object. The target and origin typically have no defined meaning.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Offer: {
    uri: 'https://www.w3.org/ns/activitystreams#Offer',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally offered 50% off to Lewis",
        "type": "Offer",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "http://www.types.example/ProductOffer",
          "name": "50% Off!"
        },
        "target": {
          "type": "Person",
          "name": "Lewis"
        }
      }
    ],
    notes: `Indicates that the actor is offering the object. If specified, the target indicates the entity to which the object is being offered.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Invite: {
    uri: 'https://www.w3.org/ns/activitystreams#Invite',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally invited John and Lisa to a party",
        "type": "Invite",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Event",
          "name": "A Party"
        },
        "target": [
          {
            "type": "Person",
            "name": "John"
          },
          {
            "type": "Person",
            "name": "Lisa"
          }
        ]
      }
    ],
    notes: `A specialization of Offer in which the actor is extending an invitation for the object to the target.`,
    extends: 'Offer',
  // Properties:	Inherits all properties from Offer.
  },
  Reject: {
    uri: 'https://www.w3.org/ns/activitystreams#Reject',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally rejected an invitation to a party",
        "type": "Reject",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Invite",
          "actor": "http://john.example.org",
          "object": {
            "type": "Event",
            "name": "Going-Away Party for Jim"
          }
        }
      }
    ],
    notes: `Indicates that the actor is rejecting the object. The target and origin typically have no defined meaning.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  TentativeReject: {
    uri: 'https://www.w3.org/ns/activitystreams#TentativeReject',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally tentatively rejected an invitation to a party",
        "type": "TentativeReject",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Invite",
          "actor": "http://john.example.org",
          "object": {
            "type": "Event",
            "name": "Going-Away Party for Jim"
          }
        }
      }
    ],
    notes: `A specialization of Reject in which the rejection is considered tentative.`,
    extends: 'Reject',
  // Properties:	Inherits all properties from Reject.
  },
  Remove: {
    uri: 'https://www.w3.org/ns/activitystreams#Remove',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally removed a note from her notes folder",
        "type": "Remove",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/notes/1",
        "target": {
          "type": "Collection",
          "name": "Notes Folder"
        }
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "The moderator removed Sally from a group",
        "type": "Remove",
        "actor": {
          "type": "http://example.org/Role",
          "name": "The Moderator"
        },
        "object": {
          "type": "Person",
          "name": "Sally"
        },
        "origin": {
          "type": "Group",
          "name": "A Simple Group"
        }
      }
    ],
    notes: `Indicates that the actor is removing the object. If specified, the origin indicates the context from which the object is being removed.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Undo: {
    uri: 'https://www.w3.org/ns/activitystreams#Undo',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally retracted her offer to John",
        "type": "Undo",
        "actor": "http://sally.example.org",
        "object": {
          "type": "Offer",
          "actor": "http://sally.example.org",
          "object": "http://example.org/posts/1",
          "target": "http://john.example.org"
        }
      }
    ],
    notes: `Indicates that the actor is undoing the object. In most cases, the object will be an Activity describing some previously performed action (for instance, a person may have previously "liked" an article but, for whatever reason, might choose to undo that like at some later point in time).

The target and origin typically have no defined meaning.`,

    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Update: {
    uri: 'https://www.w3.org/ns/activitystreams#Update',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally updated her note",
        "type": "Update",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/notes/1"
      }
    ],
    notes: `Indicates that the actor has updated the object. Note, however, that this vocabulary does not define a mechanism for describing the actual set of modifications made to object.

The target and origin typically have no defined meaning.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  View: {
    uri: 'https://www.w3.org/ns/activitystreams#View',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally read an article",
        "type": "View",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Article",
          "name": "What You Should Know About Activity Streams"
        }
      }
    ],
    notes: `Indicates that the actor has viewed the object.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Listen: {
    uri: 'https://www.w3.org/ns/activitystreams#Listen',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally listened to a piece of music",
        "type": "Listen",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/music.mp3"
      }
    ],
    notes: `Indicates that the actor has listened to the object.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Read: {
    uri: 'https://www.w3.org/ns/activitystreams#Read',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally read a blog post",
        "type": "Read",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/posts/1"
      }
    ],
    notes: `Indicates that the actor has read the object.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Move: {
    uri: 'https://www.w3.org/ns/activitystreams#Move',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally moved a post from List A to List B",
        "type": "Move",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/posts/1",
        "target": {
          "type": "Collection",
          "name": "List B"
        },
        "origin": {
          "type": "Collection",
          "name": "List A"
        }
      }
    ],
    notes: `Indicates that the actor has moved object from origin to target. If the origin or target are not specified, either can be determined by context.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Travel: {
    uri: 'https://www.w3.org/ns/activitystreams#Travel',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally went home from work",
        "type": "Travel",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "target": {
          "type": "Place",
          "name": "Home"
        },
        "origin": {
          "type": "Place",
          "name": "Work"
        }
      }
    ],
    notes: `Indicates that the actor is traveling to target from origin. Travel is an IntransitiveObject whose actor specifies the direct object. If the target or origin are not specified, either can be determined by context.`,
    extends: 'IntransitiveActivity',
  // Properties:	Inherits all properties from IntransitiveActivity.
  },
  Announce: {
    uri: 'https://www.w3.org/ns/activitystreams#Announce',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally announced that she had arrived at work",
        "type": "Announce",
        "actor": {
          "type": "Person",
          "id": "http://sally.example.org",
          "name": "Sally"
        },
        "object": {
          "type": "Arrive",
          "actor": "http://sally.example.org",
          "location": {
            "type": "Place",
            "name": "Work"
          }
        }
      }
    ],
    notes: `Indicates that the actor is calling the target's attention the object.

The origin typically has no defined meaning.`,

    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Block: {
    uri: 'https://www.w3.org/ns/activitystreams#Block',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally blocked Joe",
        "type": "Block",
        "actor": "http://sally.example.org",
        "object": "http://joe.example.org"
      }
    ],
    notes: `Indicates that the actor is blocking the object. Blocking is a stronger form of Ignore. The typical use is to support social systems that allow one user to block activities or content of other users. The target and origin typically have no defined meaning.`,
    extends: 'Ignore',
  // Properties:	Inherits all properties from Ignore.
  },
  Flag: {
    uri: 'https://www.w3.org/ns/activitystreams#Flag',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally flagged an inappropriate note",
        "type": "Flag",
        "actor": "http://sally.example.org",
        "object": {
          "type": "Note",
          "content": "An inappropriate note"
        }
      }
    ],
    notes: `Indicates that the actor is "flagging" the object. Flagging is defined in the sense common to many social platforms as reporting content as being inappropriate for any number of reasons.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Dislike: {
    uri: 'https://www.w3.org/ns/activitystreams#Dislike',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally disliked a post",
        "type": "Dislike",
        "actor": "http://sally.example.org",
        "object": "http://example.org/posts/1"
      }
    ],
    notes: `Indicates that the actor dislikes the object.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Question: {
    uri: 'https://www.w3.org/ns/activitystreams#Question',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Question",
        "name": "What is the answer?",
        "oneOf": [
          {
            "type": "Note",
            "name": "Option A"
          },
          {
            "type": "Note",
            "name": "Option B"
          }
        ]
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Question",
        "name": "What is the answer?",
        "closed": "2016-05-10T00:00:00Z"
      }
    ],
    notes: `Represents a question being asked. Question objects are an extension of IntransitiveActivity. That is, the Question object is an Activity, but the direct object is the question itself and therefore it would not contain an object property.

Either of the anyOf and oneOf properties may be used to express possible answers, but a Question object must not have both properties.`,

    extends: 'IntransitiveActivity',
    properties: [
      'oneOf', 'anyOf', 'closed'
    ]
  }
};
