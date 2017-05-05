const activityTypes = {
  Accept: {
    name: 'Accept',
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
    name: 'TentativeAccept',
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
    name: 'Add',
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
    name: 'Arrive',
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
    name: 'Create',
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
    name: 'Delete',
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
    name: 'Follow',
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
    name: 'Ignore',
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
    name: 'Join',
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
    name: 'Leave',
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
    name: 'Like',
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
    name: 'Offer',
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
    name: 'Invite',
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
    name: 'Reject',
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
    name: 'TentativeReject',
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
    name: 'Remove',
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
    name: 'Undo',
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
    name: 'Update',
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
    name: 'View',
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
    name: 'Listen',
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
    name: 'Read',
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
    name: 'Move',
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
    name: 'Travel',
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
    name: 'Announce',
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
    name: 'Block',
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
    name: 'Flag',
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
    name: 'Dislike',
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
    name: 'Question',
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

const actorTypes = {
  Application: {
    name: 'Application',
    uri: 'https://www.w3.org/ns/activitystreams#Application',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Application",
        "name": "Exampletron 3000"
      }],
    notes: `Describes a software application.`,
    extends: `Object`,
  },
  Group: {
    name: 'Group',
    uri: 'https://www.w3.org/ns/activitystreams#Group',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Group",
        "name": "Big Beards of Austin"
      }],
    notes: `Represents a formal or informal collective of Actors.`,
    extends: `Object`,
  },

  Organization: {
    name: 'Organization',
    uri: 'https://www.w3.org/ns/activitystreams#Organization',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Organization",
        "name": "Example Co."
      }],
    notes: `Represents an organization.`,
    extends: `Object`,
  },
  Person: {
    name: 'Person',
    uri: 'https://www.w3.org/ns/activitystreams#Person',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Person",
        "name": "Sally Smith"
      }],
    notes: `Represents an individual person.`,
    extends: `Object`,
  },
  Service: {
    name: 'Service',
    uri: 'https://www.w3.org/ns/activitystreams#Service',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Service",
        "name": "Acme Web Service"
      }],
    notes: `Represents a service of any kind.`,
    extends: `Object`,
  }
};

const objectAndLinkTypes = {
  Relationship: {
    name: 'Relationship',
    uri: 'https://www.w3.org/ns/activitystreams#Relationship',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally is an acquaintance of John",
        "type": "Relationship",
        "subject": {
          "type": "Person",
          "name": "Sally"
        },
        "relationship": "http://purl.org/vocab/relationship/acquaintanceOf",
        "object": {
          "type": "Person",
          "name": "John"
        }
      }],
    notes: `Describes a relationship between two individuals. The subject and object properties are used to identify the connected individuals.

See 5.2 Representing Relationships Between Entities for additional information.`,

    extends: `Object`,
    properties: [
      'subject', 'object', 'relationship'
    ],
  },

  Article: {
    name: 'Article',
    uri: 'https://www.w3.org/ns/activitystreams#Article',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Article",
        "name": "What a Crazy Day I Had",
        "content": "<div>... you will never believe ...</div>",
        "attributedTo": "http://sally.example.org"
      }],
    notes: `Represents any kind of multi-paragraph written work.`,
    extends: `Object`,
  },
  Document: {
    name: 'Document',
    uri: 'https://www.w3.org/ns/activitystreams#Document',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Document",
        "name": "4Q Sales Forecast",
        "url": "http://example.org/4q-sales-forecast.pdf"
      }],
    notes: `Represents a document of any kind.`,
    extends: `Object`,
  },
  Audio: {
    name: 'Audio',
    uri: 'https://www.w3.org/ns/activitystreams#Audio',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Audio",
        "name": "Interview With A Famous Technologist",
        "url": {
          "type": "Link",
          "href": "http://example.org/podcast.mp3",
          "mediaType": "audio/mp3"
        }
      }],
    notes: `Represents an audio document of any kind.`,
    extends: `Document`,
  },
  Image: {
    name: 'Image',
    uri: 'https://www.w3.org/ns/activitystreams#Image',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Image",
        "name": "Cat Jumping on Wagon",
        "url": [
          {
            "type": "Link",
            "href": "http://example.org/image.jpeg",
            "mediaType": "image/jpeg"
          },
          {
            "type": "Link",
            "href": "http://example.org/image.png",
            "mediaType": "image/png"
          }
        ]
      }],
    notes: `An image document of any kind`,
    extends: `Document`,
  },
  Video: {
    name: 'Video',
    uri: 'https://www.w3.org/ns/activitystreams#Video',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Video",
        "name": "Puppy Plays With Ball",
        "url": "http://example.org/video.mkv",
        "duration": "PT2H"
      }],
    notes: `Represents a video document of any kind.`,
    extends: `Document`,
  },
  Note: {
    name: 'Note',
    uri: 'https://www.w3.org/ns/activitystreams#Note',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Note",
        "name": "A Word of Warning",
        "content": "Looks like it is going to rain today. Bring an umbrella!"
      }],
    notes: `Represents a short written work typically less than a single paragraph in length.`,
    extends: `Object`,
  },
  Page: {
    name: 'Page',
    uri: 'https://www.w3.org/ns/activitystreams#Page',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Page",
        "name": "Omaha Weather Report",
        "url": "http://example.org/weather-in-omaha.html"
      }],
    notes: `Represents a Web Page.`,
    extends: `Document`,
  },
  Event: {
    name: 'Event',
    uri: 'https://www.w3.org/ns/activitystreams#Event',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Event",
        "name": "Going-Away Party for Jim",
        "startTime": "2014-12-31T23:00:00-08:00",
        "endTime": "2015-01-01T06:00:00-08:00"
      }],
    notes: `Represents any kind of event.`,
    extends: `Object`,
  },
  Place: {
    name: 'Place',
    uri: 'https://www.w3.org/ns/activitystreams#Place',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Place",
        "name": "Work"
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Place",
        "name": "Fresno Area",
        "latitude": 36.75,
        "longitude": 119.7667,
        "radius": 15,
        "units": "miles"
      }],
    notes: `Represents a logical or physical location. See 5.3 Representing Places for additional information.`,
    extends: `Object`,
    properties: [
      'accuracy', 'altitude', 'latitude', 'longitude', 'radius', 'units'],
  },
  Mention: {
    name: 'Mention',
    uri: 'https://www.w3.org/ns/activitystreams#Mention',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Mention of Joe by Carrie in her note",
        "type": "Mention",
        "href": "http://example.org/joe",
        "name": "Joe"
      }],
    notes: `A specialized Link that represents an @mention.`,
    extends: `Link`,
  },
  Profile: {
    name: 'Profile',
    uri: 'https://www.w3.org/ns/activitystreams#Profile',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Profile",
        "summary": "Sally's Profile",
        "describes": {
          "type": "Person",
          "name": "Sally Smith"
        }
      }],
    notes: `A Profile is a content object that describes another Object, typically used to describe Actor Type objects. The describes property is used to reference the object being described by the profile.`,
    extends: `Object`,
    Properties: ['describes'],
  },

  Tombstone: {
    name: 'Tombstone',
    uri: 'https://www.w3.org/ns/activitystreams#Tombstone',
    examples: [
      {
        "type": "OrderedCollection",
        "totalItems": 3,
        "name": "Vacation photos 2016",
        "orderedItems": [
          {
            "type": "Image",
            "id": "http://image.example/1"
          },
          {
            "type": "Tombstone",
            "formerType": "Image",
            "id": "http://image.example/2",
            "deleted": "2016-03-17T00:00:00Z"
          },
          {
            "type": "Image",
            "id": "http://image.example/3"
          }
        ]
      }],
    notes: `A Tombstone represents a content object that has been deleted. It can be used in Collections to signify that there used to be an object at this position, but it has been deleted.`,
    extends: `Object`,
    properties: ['formerType', 'deleted'],
  },
}

const coreTypes = {
  Object: {
    name: 'Object',
    uri: 'https://www.w3.org/ns/activitystreams#Object',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Object",
        "id": "http://www.test.example/object/1",
        "name": "A Simple, non-specific object"
      }],
    notes: `Describes an object of any kind. The Object type serves as the base type for most of the other kinds of objects defined in the Activity Vocabulary, including other Core types such as Activity, IntransitiveActivity, Collection and OrderedCollection.`,
    disjoint: 'Link',
    properties: [
      'attachment', 'attributedTo', 'audience', 'content', 'context', 'name', 'endTime', 'generator', 'icon', 'image', 'inReplyTo', 'location', 'preview', 'published', 'replies', 'startTime', 'summary', 'tag', 'updated', 'url', 'to', 'bto', 'cc', 'bcc', 'mediaType', 'duration'
    ]
  },

  Link: {
    name: 'Link',
    uri: 'https://www.w3.org/ns/activitystreams#Link',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Link",
        "href": "http://example.org/abc",
        "hreflang": "en",
        "mediaType": "text/html",
        "name": "An example link"
      }],
    notes: `A Link is an indirect, qualified reference to a resource identified by a URL. The fundamental model for links is established by [ RFC5988]. Many of the properties defined by the Activity Vocabulary allow values that are either instances of Object or Link. When a Link is used, it establishes a qualified relation connecting the subject (the containing object) to the resource identified by the href. Properties of the Link are properties of the reference as opposed to properties of the resource.`,
    disjoint: `Object`,
    properties: [
      'href', 'rel', 'mediaType', 'name', 'hreflang', 'height', 'width', 'preview'],
  },
  Activity: {
    name: 'Activity',
    uri: 'https://www.w3.org/ns/activitystreams#Activity',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Activity",
        "summary": "Sally did something to a note",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Note",
          "name": "A Note"
        }
      }],
    notes: `An Activity is a subtype of Object that describes some form of action that may happen, is currently happening, or has already happened. The Activity type itself serves as an abstract base type for all types of activities. It is important to note that the Activity type itself does not carry any specific semantics about the kind of action being taken.`,
    extends: `Object`,
    properties: [
      'actor', 'object', 'target', 'result', 'origin', 'instrument'
    ],
  },
  IntransitiveActivity: {
    name: 'IntransitiveActivity',
    uri: 'https://www.w3.org/ns/activitystreams#IntransitiveActivity',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Travel",
        "summary": "Sally went to work",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "target": {
          "type": "Place",
          "name": "Work"
        }
      }],
    notes: `Instances of IntransitiveActivity are a subtype of Activity representing intransitive actions. The object property is therefore inappropriate for these activities.`,
    extends: `Activity`,
  },

  Collection: {
    name: 'Collection',
    uri: 'https://www.w3.org/ns/activitystreams#Collection',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally's notes",
        "type": "Collection",
        "totalItems": 2,
        "items": [
          {
            "type": "Note",
            "name": "A Simple Note"
          },
          {
            "type": "Note",
            "name": "Another Simple Note"
          }
        ]
      }],
    notes: `A Collection is a subtype of Object that represents ordered or unordered sets of Object or Link instances.

Refer to the Activity Streams 2.0 Core specification for a complete description of the Collection type.`,

    extends: `Object`,
    properties: ['totalItems', 'current', 'first', 'last', 'items'],
  },
  OrderedCollection: {
    name: 'OrderedCollection',
    uri: 'https://www.w3.org/ns/activitystreams#OrderedCollection',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally's notes",
        "type": "OrderedCollection",
        "totalItems": 2,
        "orderedItems": [
          {
            "type": "Note",
            "name": "A Simple Note"
          },
          {
            "type": "Note",
            "name": "Another Simple Note"
          }
        ]
      }],
    notes: `A subtype of Collection in which members of the logical collection are assumed to always be strictly ordered.`,

    extends: `Collection`,
  },

  CollectionPage: {
    name: 'CollectionPage',
    uri: 'https://www.w3.org/ns/activitystreams#CollectionPage',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Page 1 of Sally's notes",
        "type": "CollectionPage",
        "id": "http://example.org/foo?page=1",
        "partOf": "http://example.org/foo",
        "items": [
          {
            "type": "Note",
            "name": "A Simple Note"
          },
          {
            "type": "Note",
            "name": "Another Simple Note"
          }
        ]
      }],
    notes: `Used to represent distinct subsets of items from a Collection. Refer to the Activity Streams 2.0 Core for a complete description of the CollectionPage object.`,

    extends: `Collection`,
    properties: ['partOf', 'next', 'prev'],

  },
  OrderedCollectionPage: {
    name: 'OrderedCollectionPage',
    uri: 'https://www.w3.org/ns/activitystreams#OrderedCollectionPage',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Page 1 of Sally's notes",
        "type": "OrderedCollectionPage",
        "id": "http://example.org/foo?page=1",
        "partOf": "http://example.org/foo",
        "orderedItems": [
          {
            "type": "Note",
            "name": "A Simple Note"
          },
          {
            "type": "Note",
            "name": "Another Simple Note"
          }
        ]
      }],
    notes: `Used to represent ordered subsets of items from an OrderedCollection. Refer to the Activity Streams 2.0 Core for a complete description of the OrderedCollectionPage object.`,

    extends: ['OrderedCollection', 'CollectionPage'],
    properties: [
      'startIndex'
    ]
  }
};

const allTypes = Object.assign({}, coreTypes, activityTypes, actorTypes, objectAndLinkTypes)

const byURI = Object.keys(allTypes).reduce((a, e) => (a[allTypes[e].uri] = allTypes[e], a), {});

module.exports = {
  coreTypes,
  activityTypes,
  actorTypes,
  objectAndLinkTypes,
  allTypes,
  byURI
}
